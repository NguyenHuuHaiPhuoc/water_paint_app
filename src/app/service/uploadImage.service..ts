import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize, Observable } from "rxjs";

@Injectable()

export class UploadImage{
    constructor(
        private storage: AngularFireStorage
    ){}

    public uploadFile(file: File):Observable<String>{
        const filePath = `water_paint/employee/avatar/${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath,file);

        return new Observable<String>((observer) => {
            task.snapshotChanges().pipe(
                finalize(() => {
                    fileRef.getDownloadURL().subscribe(
                        (url) => {
                            observer.next(url); // Trả về URL
                            observer.complete();
                        },
                        (error) => observer.error(error)
                    )
                })
            ).subscribe();
        });
    }
}