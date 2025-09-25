import { Injectable } from "@angular/core";
import { HttpService } from "./HttpService";
import {LoginDto} from "@monorepo/auth"
import { UserDto } from "@monorepo/data";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthStateService {
    constructor(private httpService: HttpService, private router: Router) {}

    currentUser: UserDto | null = null
    
    async handleLogin(loginDto: LoginDto): Promise<string | null> {
        console.log("logging in");
        
        var resp = await this.httpService.postData<LoginDto>("/auth/login", loginDto)
        
        var data = await resp?.json()

        if(data?.message) {
            return data?.message
        }

        console.log("reading data for token");
        


        if(data?.token && data?.user) {
            this.saveToken(data?.token)

            
            this.setUser(data?.user)
            
            return null
        }
        
        return "An error ocurred"
        
        
    }

    handleLogout(){
        localStorage.removeItem("authToken")
        this.currentUser = null
        this.router.navigateByUrl("/login")

    }
    
    saveToken(token: string) {
        console.log("saving token");
        
        localStorage.setItem("authToken", token)
    }
    
    setUser(user: UserDto) {
        console.log("user");
        console.log(user);
        
        this.currentUser = user
        this.router.navigateByUrl("/")
    }


}