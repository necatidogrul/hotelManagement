export class Customer {
    id: number;
    tcNo: string;
    passportNo: string;
    nationality: string;
    firstName: string;
    lastName: string;
    middleName: string;
    streetAddress: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    notes: string;
    stayList: any[];
  
    constructor(data: any) {
      this.id = data.id;
      this.tcNo = data.tcNo || '';
      this.passportNo = data.passportNo || '';
      this.nationality = data.nationality || '';
      this.firstName = data.firstName || '';
      this.lastName = data.lastName || '';
      this.middleName = data.middleName || '';
      this.streetAddress = data.streetAddress || '';
      this.city = data.city || '';
      this.country = data.country || '';
      this.email = data.email || '';
      this.phone = data.phone || '';
      this.notes = data.notes || '';
      this.stayList = data.stayList || [];
    }
  }
  