"use client"

    // container function to generate the Invoice
   export const generateInvoice = (name:string) => {
    //    e.preventDefault();
       // send a post request with the name to our API endpoint
       const fetchData = async () => {
         const data = await fetch('/api/generate-invoice', {
           method: 'POST',
           body: JSON.stringify({ name }),
         });
         // convert the response into an array Buffer
         return data.arrayBuffer();
       };
   
       // convert the buffer into an object URL
       const saveAsPDF = async () => {
         const buffer = await fetchData();
         const blob = new Blob([buffer]);
         const link = document.createElement('a');
         link.href = URL.createObjectURL(blob);
         link.download = 'invoice.pdf';
         link.click();
       };
   
       saveAsPDF();
     };
 