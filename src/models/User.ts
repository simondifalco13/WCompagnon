export class User {
    id: string;
    tagId: string;
    tagName: string;
    firstname: string;
    lastname: string;
    mail: string;
    favouriteCoffee: string;
    password: string;
    pictures: string[];
    avatar: string;
    groups: string[];

    constructor(
        id: string,
        tagid: string,
        tagname: string,
        firstname: string,
        lastname: string,
        mail: string,
        coffee: string,
        password: string,
        pics: string[],
        avatar: string,
        groups: string[]
    ) {
        this.id = id;
        this.tagId = tagid;
        this.tagName = tagname;
        this.firstname = firstname;
        this.lastname = lastname;
        this.mail = mail;
        this.favouriteCoffee = coffee;
        this.password = password;
        this.pictures = pics;
        this.avatar = avatar;
        this.groups = groups;
    }
}
