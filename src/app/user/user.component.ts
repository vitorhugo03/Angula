import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { User } from './shared/user';
import { ViaCepService } from '../services/viacep.service';
import { ViaCep } from '../services/models/viacep';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  formUser: FormGroup;
  fetchingAddress: boolean = false; // New variable to track address fetching

  constructor(
    private formBuilder: FormBuilder,
    private viaCepService: ViaCepService
  ) {
    this.formUser = this.formBuilder.group({
      code: [''],
      street: [''],
      neighborhood: [''],
      city: [''],
      state: [''],
    });
  }

  ngOnInit() {
    this.createForm(new User());
  }

  onSubmit() {
    if (this.formUser.valid && !this.fetchingAddress) {
      // Check if not fetching address
      const formData = this.formUser.value;
      console.log(formData);
    } else {
      console.log(
        'O formulário não é válido ou o endereço ainda está sendo buscado.'
      );
    }
  }

  onCepChange() {
    const code = this.formUser.get('code')?.value;
    if (code.length === 8) {
      this.fetchingAddress = true; // Set fetchingAddress to true while fetching
      this.viaCepService
        .getAddress(code)
        .then((endereco: ViaCep) => {
          this.formUser.patchValue({
            street: endereco.logradouro,
            neighborhood: endereco.bairro,
            city: endereco.cidade,
            state: endereco.uf,
          });
        })
        .catch((error) => {
          console.error('Erro ao obter endereço:', error);
        })
        .finally(() => {
          this.fetchingAddress = false;
        });
    }
  }

  createForm(user: User) {
    this.formUser = this.formBuilder.group({
      name: [user.name, Validators.required],
      dateOfBirth: [user.dateOfBirth, Validators.required],
      cpf: [user.cpf, [Validators.required, Validators.minLength(12)]],
      email: [user.email, [Validators.required, Validators.email]],
      phoneNumber: [
        user.phoneNumber,
        [Validators.required, Validators.minLength(6)],
      ],
      code: [user.code, [Validators.required, Validators.minLength(8)]],
      street: [user.street, Validators.required],
      number: [user.number, Validators.required],
      complement: [user.complement, Validators.required],
      neighborhood: [user.neighborhood, Validators.required],
      city: [user.city, Validators.required],
      state: [user.state, Validators.required],
    });
  }

  userForm = new FormControl();
}
