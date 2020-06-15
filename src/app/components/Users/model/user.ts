export class User {
	public id?: string;
	public name: string;
	public surname: string;
	public position: string;
	public adress: string;
	public phone: string;
	constructor(id: string, name: string, surname: string, position: string, adress: string, phone: string) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.position = position;
		this.adress = adress;
		this.phone = phone;
	 }
}
