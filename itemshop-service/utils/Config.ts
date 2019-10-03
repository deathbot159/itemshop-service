"use strict";
export default class Config{
  private _config: JSON;
  public constructor(){
    this._config = require("../config.json"); 
  }

  getConfig(): JSON{
      return this._config;
  }
  
  getServiceConfig(): JSON{
    return this._config.service;
  }
}

