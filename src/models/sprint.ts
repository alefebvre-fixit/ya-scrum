import { Story } from './story';
import { Progress } from './progress';

export class Sprint {
    
    $key: string;
    id: number;
    code: string;
    name: string;
    status: string;
    description: string;
    
    startDate: Date;
    endDate: Date;
    duration: number;
    
    conversationId: string;

    progress:number;
    progressHistory: number[];


    impediment: Story;
    history: Progress[];

    public static getUpdate(sprint: any): any {

        const result = Object.assign({}, sprint);
        delete(result.$key);
        delete(result.$exists);
        
        return result;
    }

    public static create(): Sprint{
        let result : Sprint = new Sprint();
        
        result.duration = 15;
        result.startDate = new Date();
        result.endDate = new Date(result.startDate);
        result.startDate.setDate(result.startDate.getDate() + result.duration);

        return result;

    }

}