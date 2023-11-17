import { Notyf } from "notyf";

class NotifyService {

    private notyf = new Notyf({
        duration: 2000,
        position: { x: "center", y: "top" }
    });

    public success(message: string): void {
        this.notyf.success(message);
    }

    public error(err: any): void {
        const message = this.extractMessage(err);
        this.notyf.error(message);
    }


    private extractMessage(err: any): string {
        if (typeof err === "string") return err;
        if (typeof err.response?.data === "string") return err.response.data; // Axios
        if (Array.isArray(err.response?.data)) return err.response.data[0];
        if (typeof err.message === "string") return err.message;
        return "Some error, please try again.";
    }


}

const notifyService = new NotifyService();

export default notifyService;
