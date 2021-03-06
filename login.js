import { InputCommon } from './inputCommon.js'
import { setScreen } from './index.js'
import { Register } from './register.js'




class Login {
    container = document.createElement("div")
    title = document.createElement("h3")
    tab_group = document.createElement("div")
    form = document.createElement("form")
    forgotPass = document.createElement("div")

    inputEmail = new InputCommon("", "email", "Enter your email", "inputEmail")
    inputPassword = new InputCommon("", "password", "Enter your password", "inputPassword")
    ;

    BtnContainer = document.createElement("div")
    btnLogin = document.createElement("button")
    btnRegister = document.createElement("button")

    
    constructor() {
        this.title.innerHTML = "Login"
        this.form.className = "form"
        this.container.className = "container"
        this.btnLogin.className = "button"
    //    
        this.btnRegister.className = "button"
        this.tab_group.className = "tab-group"
        this.forgotPass.innerHTML = "Forgot password?"
        this.forgotPass.className = "forgotPass"

        this.container.appendChild(this.form)
        this.form.appendChild(this.title)
        this.form.appendChild(this.inputEmail.container)
        this.form.appendChild(this.inputPassword.container)
        this.form.appendChild(this.forgotPass)
        this.forgotPass.className = "text";

       
       this.container.appendChild(this.BtnContainer);
       this.BtnContainer.classList.add('BtnContainer')
       this.BtnContainer.appendChild(this.btnLogin);
       this.BtnContainer.appendChild(this.btnRegister);


        this.btnLogin.innerHTML = "Login"
        this.btnRegister.innerHTML = "Register"
        this.btnLogin.className = "button"
        this.btnRegister.className = "button"
        this.btnLogin.addEventListener("click", (e) => {
            e.preventDefault()
            const emailValue = this.inputEmail.getValue();
            const inputPasswordValue = this.inputPassword.getValue();
            var   MailFormat =  /^\w+@[a-zA-Z]{3,}\.com$/i;

// validtion
            if (!emailValue) {
                this.inputEmail.setErrorMessage("kh??ng ???????c ????? tr???ng")
            } else if (!emailValue.match(MailFormat)){
                this.inputEmail.setErrorMessage(" ki???m tra l???i ?????nh d???ng mail")
            }    else {
                this.inputEmail.setErrorMessage("")
                
            }         
            if (!inputPasswordValue) {
                this.inputPassword.setErrorMessage("kh??ng ???????c ????? tr???ng")
            }else{
                this.inputPassword.setErrorMessage('')
            }
      
                     
            // login
                     firebase
                     .auth()
                     .signInWithEmailAndPassword(emailValue, inputPasswordValue)
                     .then((userCredential) => {
                         // Signed in
                         var user = userCredential.user;
                         // ...
                         console.log("???? ????ng nh???p th??nh c??ng");
                     })
                     .catch((error) => {
                         var errorCode = error.code;
                         var errorMessage = error.message;
                         console.log(errorMessage);
                         console.log('vui l??ng ki???m tra l???i!')
                     });
          



        })
        this.btnRegister.addEventListener("click", this.handleRedirectRegister)
    // ???n v??o ????y th?? chuy???n m??n h??nh register
        this.tab_group.appendChild(this.btnLogin)
        this.tab_group.appendChild(this.btnRegister)
        this.form.appendChild(this.tab_group)
    }

    handleRedirectRegister = (e) => {
        e.preventDefault()
        const registerScreen = new Register()
        setScreen(registerScreen.container)
       
    }
}

export { Login }