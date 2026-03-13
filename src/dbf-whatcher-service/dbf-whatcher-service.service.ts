import { Injectable, OnModuleInit } from '@nestjs/common';
import * as chokidar from 'chokidar';
@Injectable()
export class DbfWhatcherServiceService implements OnModuleInit {
    private ruta = 'Z:\\newdesar\\Winfac_nna\\Base\\inventar.dbf';
    private ruta_test = "Z:\\ale\\prueba.txt"
    private indexRut = new Map();

    onModuleInit() {
        console.log("iniciado")
        this.watchDBF();
    }

    watchDBF() {

        const watcher = chokidar.watch(this.ruta_test, {
            usePolling: true,
            interval: 1000,
            ignoreInitial: true,
            awaitWriteFinish: true
        })

        watcher.on('add', path => console.log('Archivo creado:', path));
        watcher.on('change', path => console.log('Archivo modificado:', path));
        watcher.on('unlink', path => console.log('Archivo eliminado:', path));



    }
}
