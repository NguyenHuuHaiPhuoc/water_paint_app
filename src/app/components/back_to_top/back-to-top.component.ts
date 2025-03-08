import { Component, HostListener } from "@angular/core";

@Component({
    selector: 'app-back-to-top',
    imports: [],
    templateUrl: './back-to-top.component.html',
    styleUrl: './back-to-top.component.scss'
})

export class BackToTopComponent{
    public isVisible: boolean = false;
    @HostListener('window:scroll',[])
    onWindowScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop 
                                || document.body.scrollTop || 0;
        this.isVisible = scrollPosition > 300;
    }
    public backToTop () {
        window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }
}