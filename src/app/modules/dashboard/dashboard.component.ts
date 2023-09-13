import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Asegúrate de importar MatPaginatorModule
import { Client } from 'src/app/models/client.model';
import { faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ServiceService } from 'src/app/services/service.service';
import { serviceInt } from 'src/app/models/service.model';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '../components/todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'Code',
    'fullName',
    'income',
    'age',
    'city',
    'recommendation',
    'actions',
  ];
  service: serviceInt[] = [];

  faPenAlt = faPenAlt;
  faTrashAlt = faTrashAlt;

  constructor(
    private clientService: ClientService,
    private serviceService: ServiceService,
    private dialog: Dialog
  ) {}

  dataSource = new MatTableDataSource<Client>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.clientService.getAll().subscribe((client: any) => {
      this.dataSource.data = client;
      this.dataSource.paginator = this.paginator;
    });

    this.serviceService.getAll().subscribe((service: any) => {
      this.service = service.sort((a: any, b: any) => a.code - b.code);
    });
  }

  openDialog() {
    this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      data: {
        created: true,
      },
    });
  }

  updateDialog(user: Client) {
    this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      data: {
        created: false,
        ...user,
      },
    });
  }

  delete(id: string) {
    this.clientService.delete(id).subscribe((service: any) => {
      window.location.reload();
    });
  }

  getRecommendation(age: string, city: string, income: number): string {
    const isPanama = city === 'Panamá';
    const ageNumber = parseInt(age, 10);

    if (isPanama) {
      if (ageNumber >= 18) {
        if (income >= 1500) {
          return 'Tarjeta crédito';
        } else if (income >= 500) {
          return 'Tarjeta débito';
        } else {
          return 'Cuentas de ahorros';
        }
      }
    } else {
      if (ageNumber >= 25 && income >= 4500) {
        return 'Inversiones';
      } else if (ageNumber >= 15 && income >= 1000) {
        return 'Seguro';
      }
    }

    return 'No cumple con los requisitos para ninguna recomendación';
  }

  getRecommendationClass(age: string, city: string, income: number): string {
    const recommendation = this.getRecommendation(age, city, income);

    return recommendation ===
      'No cumple con los requisitos para ninguna recomendación'
      ? 'text-red-500'
      : 'text-green-500';
  }
}
