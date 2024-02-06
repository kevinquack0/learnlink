import { SearchDataAccess } from '../data/SearchDataAccess';

export class SearchService {
    private searchDataAccess: SearchDataAccess;

    constructor() {
        this.searchDataAccess = new SearchDataAccess();
    }

    async searchSessions(searchCriteria: any): Promise<any[]> {
        // Apply business logic if needed, such as validation of search criteria

        // Perform the search using the data access layer
        const sessions = await this.searchDataAccess.searchSessions(searchCriteria);
        return sessions;
    }

    // Additional methods for search-related operations can be added here
}
