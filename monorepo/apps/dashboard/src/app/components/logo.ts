import { Component } from "@angular/core";


@Component({
    selector: "app-logo",
    template: `<div class="flex flex-col gap-1">
        <div class="flex gap-1">
            <div class="bg-slate-800 w-2 h-2 rounded-full"></div>
            <div class="bg-slate-400 w-2 h-2 rounded-full"></div>
        </div>
        <div class="flex gap-1">
            <div class="bg-slate-400 w-2 h-2 rounded-full"></div>
            <div class="bg-slate-800 w-2 h-2 rounded-full"></div>
        </div>
    </div>`
})
export class Logo {}