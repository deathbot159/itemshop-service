import serverKey from './ISServer';

export default class ISResponse {

    public toPacket(message: string): string {
        let packet = `${serverKey} ${message}`;
        
        return packet;
    }
}