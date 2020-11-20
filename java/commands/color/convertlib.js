module.exports.hex_rgb = function hex_rgb(hex) {
    // Converts hex to rgb. The 6-digit "number" actually just represents values for red, green, and blue in a literal sense.
    // Returns an array in RGB notation.
    var red_hex = parseInt(hex.substring(0, 2), 16);
    var gre_hex = parseInt(hex.substring(2, 4), 16);
    var blu_hex = parseInt(hex.substring(4, 6), 16);
    return [red_hex, gre_hex, blu_hex];
}

module.exports.rgb_hex = function rgb_hex(rgb) {
    return rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
}

module.exports.rgb_hsl = function rgb_hsl(rgb) {
    // Converts rgb to hsl. A lot of math here, not worth explaining. Just google it, lol
    // Returns an array in HSL notation.
    rgb[0] /= 255;
    rgb[1] /= 255;
    rgb[2] /= 255;

    var chromaMax = Math.max(rgb[0], rgb[1], rgb[2]);
    var chromaMin = Math.min(rgb[0], rgb[1], rgb[2]);
    var chroma = chromaMax - chromaMin;

    var hueProj;
    if (chroma != 0) {
        // hue calculation
        if (chromaMax == rgb[0]) {
            hueProj = ((rgb[1] - rgb[2]) / chroma) % 6;
        }
        else if (chromaMax == rgb[1]) {
            hueProj = ((rgb[2] - rgb[0]) / chroma) + 2;
        }
        else if (chromaMax == rgb[2]) {
            hueProj = ((rgb[0] - rgb[1]) / chroma) + 4;
        }
        var hue = 60 * hueProj;
        if (hue < 0) {
            hue += 360;
        }

        // lightness calculation
        var lightness = (chromaMax + chromaMin) / 2;

        // saturation calculation. in here, saturation strictly positive (0 chroma implies 0 saturation)
        var saturation = (chroma / (1 - Math.abs(2 * lightness - 1)));

        // rounding off digits
        hue = Math.round(hue * 10) / 10;
        saturation = Math.round(saturation * 1000) / 10;
        lightness = Math.round(lightness * 1000) / 10;
        return [hue, saturation, lightness];
    }
    else {
        return -1;
    }
}

module.exports.hsl_rgb = function hsl_rgb(hsl) {
    // Converts hsl to rgb. Again, a lot of math here. If you've googled the one above, it should also have the other way around.
    // Returns an array in RGB notation.
    var hueProj = hsl[0] / 60;
    hsl[1] /= 100;
    hsl[2] /= 100;

    var primary = (1 - Math.abs(2 * hsl[2] - 1)) * hsl[1];
    var secondary = primary * (1 - Math.abs(hueProj % 2 - 1));                 //<<< colors are a combination of rgb. this finds the second highest value between r,g,b
    var scale = hsl[2] - primary / 2;

    var red_hex;
    var gre_hex;
    var blu_hex;

    // obtaining primary, secondary values
    if (hueProj >= 0 && hueProj < 1) {
        red_hex = primary;
        gre_hex = secondary;
        blu_hex = 0;
    }
    else if (hueProj >= 1 && hueProj < 2) {
        red_hex = secondary;
        gre_hex = primary;
        blu_hex = 0;
    }
    else if (hueProj >= 2 && hueProj < 3) {
        red_hex = 0;
        gre_hex = primary;
        blu_hex = secondary;
    }
    else if (hueProj >= 3 && hueProj < 4) {
        red_hex = 0;
        gre_hex = secondary;
        blu_hex = primary;
    }
    else if (hueProj >= 4 && hueProj < 5) {
        red_hex = secondary;
        gre_hex = 0;
        blu_hex = primary;
    }
    else if (hueProj >= 5 && hueProj < 6) {
        red_hex = primary;
        gre_hex = 0;
        blu_hex = secondary;
    }

    red_hex = (red_hex + scale) * 255;
    gre_hex = (gre_hex + scale) * 255;
    blu_hex = (blu_hex + scale) * 255;

    // rounding off digits
    red_hex = Math.round(red_hex);
    gre_hex = Math.round(gre_hex);
    blu_hex = Math.round(blu_hex);

    return [red_hex, gre_hex, blu_hex];
}