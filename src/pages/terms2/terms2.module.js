var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Terms2Page } from './terms2';
var Terms2PageModule = /** @class */ (function () {
    function Terms2PageModule() {
    }
    Terms2PageModule = __decorate([
        NgModule({
            declarations: [
                Terms2Page,
            ],
            imports: [
                IonicPageModule.forChild(Terms2Page),
            ],
        })
    ], Terms2PageModule);
    return Terms2PageModule;
}());
export { Terms2PageModule };
//# sourceMappingURL=terms2.module.js.map