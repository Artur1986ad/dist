export class User {
	public id?: string;
	public name: string;
	public surname: string;
	public position: string;
	public country: string;
	public street: string;
	public phone: string;
	public userpic: string;

	constructor(id: string, name: string, surname: string, position: string, country: string, street: string, phone: string, userpic: string) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.position = position;
		this.country = country;
		this.street = street;
		this.phone = phone;
		this.userpic = userpic;
	 }
}
