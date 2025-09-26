import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
    providedIn: "root"
})
export class HttpService {
    constructor(private router: Router){}

    private baseUrl: string = "http://localhost:3000/api"

    async getData<T>(path: string): Promise<T | null> {
        const token = this.getToken()
        
        const resp = await fetch(`${this.baseUrl}${path}`, {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + token},
            
        })

        if(resp.status == 401) {
            this.router.navigateByUrl("/login")
            return null
        }
        
        const respData = await resp.json()
        
        return respData as T
    }
    async putData<T>(path: string, body: T): Promise<Response | null> {
        const token = this.getToken()

        const resp = await fetch(`${this.baseUrl}${path}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + token},
            body: JSON.stringify(body)
        })

        if(resp.status == 401) {
            this.router.navigateByUrl("/login")
            return null
        }

        console.log("returning response");
        

        return resp
    }

    async deleteData(path: string) {
        const token = this.getToken()

        const resp = await fetch(`${this.baseUrl}${path}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + token},
        })

        if(resp.status == 401) {
            this.router.navigateByUrl("/login")
            return null
        }

        console.log("returning response");
        

        return resp
    }
    
    async postData<T>(path: string, body: T): Promise<Response | null> {
        const token = this.getToken()

        const resp = await fetch(`${this.baseUrl}${path}`, {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization" : "Bearer " + token},
            body: JSON.stringify(body)
        })

        if(resp.status == 401) {
            this.router.navigateByUrl("/login")
            return null
        }

        console.log("returning response");
        

        return resp
    }

    private getToken() {
        const token = localStorage.getItem("authToken")
        
        return token
    }
}