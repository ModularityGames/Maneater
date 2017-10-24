#!/bin/bash

rm -rf tiles

case $1 in
  mpz)
    ../gdal2tiles-multiprocess.py -l -p raster -z 0-5 -w none WorldRenderBIG.jpg tiles
    ;;
  mp)
    ../gdal2tiles-multiprocess.py -l -p raster -w none WorldRenderBIG.jpg tiles
    ;;
  z)
    ../gdal2tiles.py -l -p raster -w none WorldRenderBIG.jpg -z 0-5 tiles
    ;;
  *)
    ../gdal2tiles.py -l -p raster -w none WorldRenderBIG.jpg tiles
    ;;
esac
