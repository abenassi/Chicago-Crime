# Chicago-Crime
Small visualization of crimes in Chicago by type of crime and time range.

The map shows the amount of crimes occurred in each Community Area. It can be filtered by time and primary type of crime.

The dataset used is the csv version of the Chicago Crimes from 2001 to present downloadable from:
https://catalog.data.gov/dataset/crimes-2001-to-present-398a4

The shapefile used to plot the Community Areas can be downloaded from:
https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Community-Areas-current-/cauq-8yn6

In ![this ipython notebook](Chicago-Crime.ipynb) the dataset is quickly explored and reduced to a smaller version `crimes_collapsed.csv` that is uploaded to CartoDB for mapping.

The reduced dataset can also be generated from the original version running

```
python create_dataset.py
```

```
import create_dataset
create_dataset.main()
```

A downloaded csv copy of the crimes dataset called [Crimes_-_2001_to_present.csv](https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.csv?accessType=DOWNLOAD) must be in the "datasets" folder for the script to work!
