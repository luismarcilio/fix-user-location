# FIX USER ADDRESS BY PHONE NUMBER
## From story [PE-691](https://plato.atlassian.net/browse/PE-691): 

### Tech Factoring
#### From phone number

I found a service [Reverse Phone Lookup](https://www.comfi.com/abook/reverse) that can provide city information from phone numbers. Seems free.

We have to call the service, scrap the returned html page, and update the database

I believe that NodeJS applies better than java here

This is the most assertive way to infer the place but only 4759 users have phone number