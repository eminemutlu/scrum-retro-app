
class Service {
    
    public static init() {
        //generating user Id by random on local storage for voting max ticket control
        const userLocalStorage = "userId";
        window.localStorage.removeItem(userLocalStorage);
        const randomKey = Math.floor(Math.random() * 10000);
        window.localStorage.setItem(userLocalStorage, `${randomKey}`);

    }

}

export default Service;