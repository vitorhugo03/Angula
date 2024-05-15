import { Injectable } from '@angular/core';
import { ViaCep } from './models/viacep';

@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  constructor() {}

  getAddress(cep: string): Promise<ViaCep> {
    return fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return new ViaCep(
          data.logradouro,
          data.numero,
          data.complemento,
          data.bairro,
          data.localidade,
          data.uf,
          data.cep,
          data.ibge,
          data.gia,
          data.ddd,
          data.siafi
        );
      });
  }
}
