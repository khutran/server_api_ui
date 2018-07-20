import {
  GET_CATEGORY_REQUESTED,
  EDIT_CATEGORY_REQUESTED
} from "./edit.actions";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import store from "./../../../store/store.module";
import { FETCH_CATEGORIES_REQUESTED } from "../list/list.actions";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
  public store = store;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    store.dispatch({ type: FETCH_CATEGORIES_REQUESTED });
    store.dispatch({
      type: GET_CATEGORY_REQUESTED,
      data: this.getCategoryId()
    });
  }

  onSubmit(form) {
    if (form.valid) {
      store.dispatch({
        type: EDIT_CATEGORY_REQUESTED,
        data: (store as any).getState().Category.edit.item
      });
    }
  }

  getCategoryId() {
    return this.route.snapshot.paramMap.get("id");
  }
}
