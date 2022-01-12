# dart-sass-importer
Test out custom importers for dart sass

`npm run build`

## node-sass

**Expected output**

```
node-sass render:  ../exists
node-sass render:  missing
```

**Actual output**

```
node-sass render:  ../exists
node-sass render:  missing
```

## dart-sass

**Expected ouput**

```
dart-sass render:  ../exists
dart-sass render:  missing
dart-sass compile:  ../exists
dart-sass compile:  missing
```

**Actual output**

```
dart-sass render:  missing
dart-sass compile:  missing
```
