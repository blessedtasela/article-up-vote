import { Injectable } from "@angular/core";

export class Articles {
    title: string;
    link: string;
    votes: number

    constructor(title: string, link: string, votes: number) {
        this.title = title;
        this.link = link;
        this.votes = votes;
    }

    voteUp(): void {
        this.votes += 1;
    }

    voteDown(): void {
        this.votes -= 1;
    }

    // domain(): utility function that extracts the domain from a URL.
    domain(): string {
        try {
            const domainAndPath: string = this.link.split('//')[1];
            return domainAndPath.split('/')[0];
        }
        catch (err) {
            return '';
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    username: any;
    date: any;
    articles: Articles[] = []

    constructor() {
        this.articles = [
            new Articles("Google Homepage", 'https://google.com', 5),
            new Articles("Instagram Homepage", 'https://instagram.com', 15),
            new Articles("Facebook Homepage", 'https://facebook.com', 3),
            new Articles("Twitter Homepage", 'https://twitter.com', 7),
            new Articles("LinkedIn Homepage", 'https://linkedin.com', 9),
            new Articles("GitHub Homepage", 'https://github.com', 12),
            new Articles("Reddit Homepage", 'https://reddit.com', 6),
            new Articles("Amazon Homepage", 'https://amazon.com', 10)
        ];
    }
    
    login(username: any) {
        this.username = username;
        localStorage.setItem("articleLoggedIn", username.toString());
        console.log('current user:', this.username);
        this.date = new Date
    }

    getCurrentUser() {
        return localStorage.getItem("articleLoggedIn")
    }

    logout() {
        localStorage.removeItem("articleLoggedIn")
    }
}
export const oneSec = () => 1000;

// Function to get the current time in 12-hour format
export const getCurrentTime = (time: Date) => {
    const date = time;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0'); // Convert 0 to 12 for 12 AM
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return {
        hours: formattedHours,
        minutes: formattedMinutes,
        seconds: formattedSeconds,
        ampm: ampm,
    };
};

export const clear = () => console.clear();
export const log = (message: any) => console.log(message);
export const display = (target: any) => (time: any) => {
    clear();
    target(time);
};

export const startCounting = (startDate: Date) => {
    let currentTime = startDate;

    setInterval(() => {
        currentTime.setSeconds(currentTime.getSeconds() + 1);
        const time = getCurrentTime(currentTime);
        display(log)(time);
    }, oneSec());
};
