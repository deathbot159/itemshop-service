"use strict";
export default class Config{
  public constructor(){
    this._config = require("../config.json"); 
  }

  getConfig(): JSON{
      return this._config;
  }

  private _config: JSON;
}

