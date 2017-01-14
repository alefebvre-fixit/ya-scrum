import { Progress } from './progress';

export class Story{
    
    $key: string;
    name: string;
    status: string;
    type: string;

    description: string;
    acceptanceCriterias : string;
    comment: string;
    duration: number;
    
    priority: number;
    estimate: number;
    size: number;
    sprintId: string;

    progress:number;

    history: Progress[];


    public static getUpdate(story: any): any {

        const result = Object.assign({}, story);
        delete(result.$key);
        delete(result.$exists);
        
        return result;
    }


    public static create(): Story{
        let result : Story = new Story();
        
        result.priority = 1;
        result.status = 'new';
        result.type = 'feature';
        result.size = 1;
        result.progress = 0;
        
        return result;
    }
}
