import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './../../../common/pipes/pipes.module';
import { DirectivesModule } from './../../../common/directives/directives.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { EditRoutingModule } from './edit-routing.module';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { OffersReceivedComponent } from './offers-received/offers-received.component';
import { OffersMadeComponent } from './offers-made/offers-made.component';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
        PipesModule,
        FormsModule,
        EditRoutingModule,
        SweetAlert2Module
    ],
    declarations: [CustomerViewComponent, AccountInfoComponent, AddressesComponent, OrdersComponent, CartComponent, WishlistComponent, NewsletterComponent, OffersReceivedComponent, OffersMadeComponent]
})

export class EditModule {}
