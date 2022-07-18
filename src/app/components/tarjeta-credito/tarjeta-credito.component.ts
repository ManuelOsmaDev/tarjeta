import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[] = [
    {
      titular: 'Manuel Osma',
      numeroTarjeta: 121212,
      fechaExpiracion: '11-12',
      cvv: 676,
    },
    {
      titular: 'Milena Osma',
      numeroTarjeta: 123231,
      fechaExpiracion: '11-10',
      cvv: 126,
    },
  ];

  forms: FormGroup;
  constructor(private fb: FormBuilder ,private toastr: ToastrService) {
    this.forms = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });

  }

  ngOnInit(): void {}

  agregarTarjeta() {
    console.log(this.forms);

    const tarjeta: any = {
      titular: this.forms.get('titular')?.value,
      numeroTarjeta: this.forms.get('numeroTarjeta')?.value,
      fechaExpiracion: this.forms.get('fechaExpiracion')?.value,
      cvv: this.forms.get('cvv')?.value,
    };
    this.listTarjetas.push(tarjeta);
    console.log(tarjeta);
    this.forms.reset();

    this.toastr.success('Guardado', 'Enviado con exito!')
  }

  eliminarTarjeta(i:number){
    console.log(i);
    this.listTarjetas.splice(i,1)
    this.toastr.error('Correctamente', 'Eliminado')
  }
}
