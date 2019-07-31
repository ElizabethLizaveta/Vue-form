/* eslint-disable no-undef */

export default () => {
    'use strict';

    if(!Vue){
        console.log('Vue is "undefined"');
        return;
    }
    
    Vue.debug = true;
    Vue.use(VeeValidate);

    new Vue({
        el: '#form-app',
        data() {
            return {
                formSteps: ['main-info', 'additional-info'],
                index: 0,
                userInfo: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    age: '',
                    skype: '',
                    hobby: '',
                    phone: '',
                    nickname: ''
                },
                users: []
            };
        },
        methods: {
            addInfo() {
                const scopeName = this.formSteps[this.index];
        this.$validator.validateAll(scopeName).then((result) => {
                  if (this.index === this.formSteps.length - 1) {
                    this.users.push(Object.assign({}, this.userInfo));
                    this.localStorageSave();
                    Object.keys(this.userInfo).forEach(key => {
                      this.userInfo[key] = '';
                    });
                     // Reset step
                     this.index = 0;
                     // Clear validation errors after model resetting
                     setTimeout(()=>{
                     this.$validator.errors.clear();
                    }, 0);
                    } else if (this.index < this.formSteps.length - 1) {
                        // Set next step
                        this.index++;              
                      }
                });
              },
              back() {
                if (this.index > 0) {
                  this.index--;
                }
              },
            localStorageSave() {
                localStorage.setItem('users', JSON.stringify(this.users));
            },
            localStorageGet() {
                 const users = JSON.parse(localStorage.getItem('users'));
                 if (users) {
                    this.users = users;
                  }
            }
        },
        created() {
            this.localStorageGet();
        }
    });
};
