import { OffersReceivedComponent } from './offers-received/offers-received.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders/orders.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { OffersMadeComponent } from './offers-made/offers-made.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerViewComponent
    },
    {
        path: 'customer-view',
        component: CustomerViewComponent
    },
    {
        path: 'account-info',
        component: AccountInfoComponent
    },
    {
        path: 'addresses',
        component: AddressesComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'wishlist',
        component: WishlistComponent
    },
    {
        path: 'newsletter',
        component: NewsletterComponent
    },
    {
        path: 'offers-received',
        component: OffersReceivedComponent
    },
    {
        path: 'offers-made',
        component: OffersMadeComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class EditRoutingModule {}
