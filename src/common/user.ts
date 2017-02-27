export class User {
    static uid: string
    static email: string

    static reset() {
        this.uid = null
        this.email = null
    }
}