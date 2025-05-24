import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize, Observable } from "rxjs";

@Injectable()

export class UploadImage{
    constructor(
        private storage: AngularFireStorage
    ){}

    public async getAllItemFirebase(path:any): Promise<any[]>{
        const fileRef = this.storage.ref(path);
        const result = await fileRef.listAll().toPromise();
        return result?.items || [];
    }

    public uploadFile(path:any,file: File):Observable<String>{
        const filePath = `${path}/${file.name}`;
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

    public async deleteImageFireBase(urlImage:any, filePath:any){
        const fileRef = this.storage.ref(filePath);
        fileRef.listAll().subscribe((result) => {
            result.items.forEach(async item => {
                try {
                    const url = await item.getDownloadURL();
                    if(url.includes(urlImage)){
                        await item.delete();
                        console.log('Delete image in firebase successfully!')
                    }else{
                        console.log('Image not exits!')
                    }
                } catch (err) {
                    console.error(`Lỗi khi lấy URL của ${item.name}:`, err)
                }
            });
        });
    }
}