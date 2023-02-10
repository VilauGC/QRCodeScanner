Steps for configure ngx-scanner for scanning qr codes

1. Create a new angular app with ng new qrCodeScanner

2. Navigate to the folder and delete the dummy html 

3. Head over to https://github.com/zxing-js/ngx-scanner

4. Install this packages: 
npm i @zxing/browser@latest --save
npm i @zxing/library@latest --save
npm i @zxing/ngx-scanner@latest --save

5. Import the module in app.module

import { ZXingScannerModule } from '@zxing/ngx-scanner';

6. Put the component in the interface

<zxing-scanner></zxing-scanner>

And that's it, so they say.

First Error: 

Error: Module build failed (from ./node_modules/@angular-devkit/build-angular/src/babel/webpack-loader.js):
TypeError: Cannot create property 'message' on string 'C:\2.ANGULAR\PROIECTE\5. Demo QRCodeScanner\qrCodeScanner\node_modules\@zxing\ngx-scanner\fesm2015\zxing-ngx-scanner.mjs: This application depends upon a library published using Angular version 14.0.2, which requires Angular version 14.0.0 or newer to work correctly.
Consider upgrading your application to use a more recent version of Angular.

Let's see: 
Which version of cli did I used when created the project? 
Angular CLI: 13.3.9

So the problem is that my dependencies are up to date with the latest angular version which is 14. 
This means that I have to downgrade the installation of the packages for ngx-scanner. 
Let's get over to npm site to get the correct version based on my angular cli.

I chose this one: npm i @zxing/ngx-scanner@3.5.0

Apparently it ran. And asked my permission for using my laptop camera. 

Well nothing happens. Let's explore the repository maybe we can find the demo project.

Ops: 
https://github.com/zxing-js/ngx-scanner/blob/master/projects/zxing-scanner-demo/src/app/app.component.ts

It seems is not that simple after all. 

We have here a MediaDeviceInfo: 

the actual definition from https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo 
is: The MediaDeviceInfo interface contains information that describes a single media input or output device.

The other things inside app.component.ts are basic stuff methods and variables. 
Let's look at the html

first declare hasDevices boolean = false;

I see they use Angular Material so let's install that
ng add @angular/material

next in html is mat-menu so let's imported in app.module
import {MatMenuModule} from '@angular/material/list';
next in html mat-selection-list so let's imported in app.module
import {MatListModule} from '@angular/material/list';

Error: Type '"start"' is not assignable to type 'MatListOptionCheckboxPosition'.
It seems like this is caused by this line <mat-list-option checkboxPosition ="start" (click)="toggleTryHarder()" [selected]="tryHarder">

https://material.angular.io/components/list/api#MatListOption from here we see that there is no start value but only before and after, so let's switch it to before

implement toggleTryHarder()

Still doesn't show anything in the browser

implement toggleTorch()

next is openFormatsDialog

wait: what is BarcodeFormat ? 
We have to import it from import { BarcodeFormat } from "@zxing/library";

import this import {MatDialogModule} from '@angular/material/dialog'; in app.module
next we need a private readonly private  _dialog: MatDialog
import { MatDialog } from '@angular/material/dialog';

FormatsDialogComponent what is this? this is a separate component. let's generate it with ng g c formatsDialog
Well it seems like we have to configure this component now before moving on with our app.component.

First we will need to create a file for barcode-formats. so let's create it.

Back in formats-dialog.ts

we need to import BarcodeFormat from: import { BarcodeFormat } from '@zxing/library';

and we need to initialize it inside the constructor.

Well: @Inject(MAT_DIALOG_DATA) readonly data: any,
    private readonly _dialogRef: MatDialogRef<FormatsDialogComponent>
what the heck is this? 

What is MAT_DIALOG_DATA? it has to be imported from angular material
and also the MatDialogRef

import { MatSelectionListChange } from '@angular/material/list';

error in html: Type 'BarcodeFormat | undefined' is not assignable to type 'BooleanInput'.
  Type 'BarcodeFormat.AZTEC' is not assignable to type 'BooleanInput'. I solved it by replacing the method isEnabled

isEnabled(format: BarcodeFormat) {
    let bf = this.formatsEnabled.find((x) => x === format);
    if (bf !== undefined) {
      return false;
    } else {
      return true;
    }
  }

Next in app.component we have openInfoDialog()

and it needs hasPermission declared as a variable

AppInfoDialogComponent is another component that we have to generate. Let's do just that.
Now we should move over to app-info-dialog.html 
and start with app-info tag. O look this is another component. Let's generate that one too.
Be carefull at the selector tag of your component. Mine has app-app-info added.
changeDetection: ChangeDetectionStrategy.OnPush, this has to be documented!!!











https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b


Let's get back to app.component.html

let import in module this: MatFormFieldModule and also import {MatSelectModule} from '@angular/material/select';
let's import import {MatIconModule} from '@angular/material/icon';

Continue with zxing tag
and create the methods for his attributes

Done!!!


De facut pentru vgc-hospital:

instalez dependintele
o sa folosesc bootstrap nu material
creez o componenta noua si pun buton pe pagina principala pentru redirect catre ea



