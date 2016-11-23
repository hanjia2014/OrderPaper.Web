import { AppSettings }  from '../../settings/app.settings';

export class ItemComponent {
    imagesPath: string = AppSettings.IMAGE_PATH;
    toggleId: string;
    findOption = (options: Array<any>, key: string): string => {
        var text = '';
        options.forEach(option => {
            if (option.id == key)
                text = option.text;
        });
        return text;
    }
}