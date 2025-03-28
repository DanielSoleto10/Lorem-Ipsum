import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms"; 
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "app-login",
    templateUrl: "./login.page.html",
    styleUrls: ["./login.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage {
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required]],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log("Form submitted", this.loginForm.value);
            
        }
    }

    loginWithProvider(provider: string) {
        console.log(`Login with ${provider}`);
    }
}