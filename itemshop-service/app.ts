import ISServer from "./service/ISServer";

const IS = new ISServer();

IS.listen(IS.Config.getServiceConfig().port);

