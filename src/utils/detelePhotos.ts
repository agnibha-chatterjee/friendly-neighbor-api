import { readdir, unlink } from 'fs';
import { join } from 'path';

export const deletePhotos = (directory: string) => {
    readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            unlink(join(directory, file), (err) => {
                if (err) throw err;
            });
        }
    });
};
