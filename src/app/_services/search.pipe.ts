import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {any[]} items
     * @param {string} searchText
     * @returns {any[]}
     */

    transform(items: any[], filter: String): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.fullName.toLowerCase().indexOf(filter.toLowerCase()) > -1);
    }

    // transform(items: any[], searchText: string): any[] {
    //     debugger
    //     console.log(items);
    //     if (!items) {
    //         return [];
    //     }
    //     if (!searchText) {
    //         return items;
    //     }
    //     searchText = searchText.toLocaleLowerCase();

    //     return items.filter(item => item.fullName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    //     // return it.toLocaleLowerCase().includes(searchText);

    //     //return this.ClientList = this.ClientList.filter(item => { return (item.fullName.search(new RegExp(event, 'i')) > -1) || (item.companyName.search(new RegExp(event, 'i')) > -1) || (item.emailId.search(new RegExp(event, 'i')) > -1) || (item.industry.search(new RegExp(event, 'i')) > -1) || (item.mobileNumber.search(new RegExp(event, 'i')) > -1) })

    // };


}
