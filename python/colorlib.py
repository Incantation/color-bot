def hex_rgb(hexcolor):
    # Passes in a string 'hexcolor' and translates it to a triplet of integers.
    red=int(hexcolor[:2],16)
    grn=int(hexcolor[2:4],16)
    blu=int(hexcolor[4:],16)
    return red,grn,blu

def rgb_hex(rgb):
    # Passes in a list containing each RGB value and translates it to its hex form as a string.
    hexcolor=''
    for color in rgb:
        hexcolor+=hex(color)[2:]
    return hexcolor

def rgb_hsl(rgb):
    # Passes in a list containing each RGB value and translates it to HSL form as a triplet of integers.
    rgb[0] /= 255
    rgb[1] /= 255
    rgb[2] /= 255

    chromaMax=max(rgb)
    chromaMin=min(rgb)
    chroma=chromaMax-chromaMin

    if chroma != 0:
        # hue
        if chromaMax == rgb[0]:
            hueProj = ((rgb[1]-rgb[2])/chroma)%6
        elif chromaMax == rgb[1]:
            hueProj = ((rgb[2]-rgb[0])/chroma)+2
        elif chromaMax == rgb[2]:
            hueProj = ((rgb[0]-rgb[1])/chroma)+4
        hue=60*hueProj
        if hue < 0:
            hue+=360

        # lightness
        lightness = (chromaMax+chromaMin)/2

        # saturation
        saturation = chroma/(1-abs(2*lightness-1))

        return hue, saturation, lightness
    else:
        return -1

def hsl_rgb(hsl):
    # Passes in a list containing each HSL value and translates it to RGB form as a triplet of integers.
    hueProj = hsl[0]/60
    hsl[1] /= 100
    hsl[2] /= 100

