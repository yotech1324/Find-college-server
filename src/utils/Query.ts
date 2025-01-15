const Query = {
  // getFilter: (filtered: any) => {
  //     const criteria: any = {};
  //     Object.keys(filtered).map((key) => {
  //         const data = filtered[key];
  //         const { filterType, type, value, dateTo, dateFrom } = data;
  //         const obj: any = {};
  //         if (filterType === 'in') {
  //             obj[key] = { $in: value };
  //         } else if (filterType === 'text') {
  //             let str = new RegExp(value.trim().toLowerCase(), 'i');
  //             obj[key] = str;
  //         } else if (filterType === 'date') {
  //             if (type === 'inRange') {
  //                 const startDate = new Date(dateFrom);
  //                 startDate.setHours(0, 0, 0, -1);
  //                 const endDate = new Date(dateTo);
  //                 endDate.setHours(23, 59, 59, 1000);
  //                 obj[key] = {
  //                     $gte: startDate,
  //                     $lt: endDate
  //                 };
  //             }
  //         } else if (filterType === 'equal') {
  //             obj[key] = value;
  //         }
  //         criteria[key] = obj[key];
  //     })
  //     return criteria;
  // },
  getOrder: (sorted: any) => {
    const order: any = {}
    if (sorted && sorted.length > 0) {
      sorted.forEach((element: any) => {
        const { col, sort } = element
        order[col] = sort == 'asc' ? 1 : -1
      })
    }
  },
}
export default Query
