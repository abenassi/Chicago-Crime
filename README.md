# Chicago-Crime
Small visualization of crimes in Chicago by type of crime and time range.

The map shows the amount of crimes occurred in each Community Area. It can be filtered by time and primary type of crime.

The dataset used is the csv version of the Chicago Crimes from 2001 to present downloadable from:
https://catalog.data.gov/dataset/crimes-2001-to-present-398a4

The shapefile used to plot the Community Areas can be downloaded from:
https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Community-Areas-current-/cauq-8yn6

In this ipython notebook the dataset is quickly explored and reduced to a smaller version `crimes_collapsed.csv` that is uploaded to CartoDB for mapping.

The reduced dataset can also be generated from the original running

cmd```
python create_dataset.py
```

or 

python```
import create_dataset
create_dataset.main()
``
