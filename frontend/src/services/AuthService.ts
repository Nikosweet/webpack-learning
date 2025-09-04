
import axios, {AxiosResponse} from 'axios'
import $api from '../http/index';


export default class AuthService {
  static async login(mail: string, password: string){
    return $api.post('/buyer/login', {mail, password})
      .then(response => {

      })
  }
  static async registrationBuyer(mail: string, password: string) {
    return $api.post('/buyer/registration', {mail, password})
      .then(response => {

      })
  }

  static async registrationSeller(mail: string, password: string) {
    return $api.post('/buyer/registration', {mail, password})
      .then(response => {

      })
  }

  static async logout() {
    return $api.post('/buyer/registration')

  }
}

