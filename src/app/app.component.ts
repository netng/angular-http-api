import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './interfaces/user';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http';
  private user: User = {
    'id': 5,
    'name': 'Nan Super',
    'username': 'supernan',
    'email': 'Sincere@april.biz',
    'address': {
      'street': 'Kulas Light',
      'suite': 'Apt. 556',
      'city': 'Gwenborough',
      'zipcode': '92998-3874',
      'geo': {
        'lat': '-37.3159',
        'lng': '81.1496'
      }
    },
    'phone': '1-770-736-8031 x56442',
    'website': 'hildegard.org',
    'company': {
      'name': 'Romaguera-Crona',
      'catchPhrase': 'Multi-layered client-server neural-net',
      'bs': 'harness real-time e-markets'
    }
  };

  fileStatus = { status: '', percentage: 0 };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.onGetUsers();
    // this.onGetUser();
    // this.onCreateUser();
    // this.onUpdateUser();
    // this.onDeleteUser();
    this.onGetTextFile();
  }

  onGetUsers(): void {
    this.userService.getUsers().subscribe({
      next: ((response: HttpEvent<User[]>) => {
        console.log(response);
      }),
      error: ((error: any) => {
        console.log(error);
      }),
      complete: () => {
        console.log('Getting users done');
      }
    })
  }

  onGetUser(): void {
    this.userService.getUser().subscribe({
      next: ((response: User) => {
        console.log(response);
      }),
      error: ((error: any) => {
        console.log(error);
      }),
      complete: () => {
        console.log('Getting user done');
      }
    })
  }

  onCreateUser(): void {
    this.userService.createUser(this.user).subscribe({
      next: (response: User) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => console.log('Done creating user')
    })
  }

  onUpdateUser(): void {
    this.userService.updateUser(this.user).subscribe({
      next: (response: User) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => console.log('Done updating user')
    })
  }

  onDeleteUser(): void {
    this.userService.deleteUser(this.user).subscribe({
      next: ((response) => {
        console.log(response);
      }),
      error: ((error) => {
        console.error('something goes wrong: ', error);
      }),
      complete: (() => console.log('deleting done'))
    })
  }

  onUploadFile(files: File[]): void {
    console.log(files);
    const formData = new FormData();
    for(const file of files) {
      formData.append('file', file, file.name);
    }

    this.userService.upladoFile(formData).subscribe({
      next: ((event: HttpEvent<string>) => {
        switch(event.type) {
          case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
            console.log(event);
            this.fileStatus.percentage = Math.round(100 * event.loaded / event.total!);
            this.fileStatus.status = 'progress';
            console.log(this.fileStatus);
            break;
          case HttpEventType.Response:
            if(event.status === 201) {
              console.log(event.status);
              this.fileStatus.percentage = 0;
              this.fileStatus.status = 'done';
              console.log(this.fileStatus);
              break;
            }
        }
      }),
      error: ((error) => {
        console.log('something goes wrong ', error);
      }),
      complete: () => console.log('uploading done')
    })

  }

  onGetTextFile(): void {
    this.userService.getTextFile().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);

      },
      complete: () => console.log('Getting text file done')
    });
  }
}
