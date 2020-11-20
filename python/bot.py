import os

from discord.ext import commands
from dotenv import load_dotenv

import random
import colorlib as color

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

bot = commands.Bot(command_prefix="!")

@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord!')

@bot.command(help="ThE bOt MoCkS yOu")
@commands.has_role('user')
async def gamzee(ctx, *, message):
    cap = False
    response = ""
    for letter in message.lower():
        if cap and letter.isalpha():
            response+=chr(ord(letter)-(26+6))
        else:
            response+=letter
        cap = not cap
    await ctx.send(response)

@bot.command(help="uwu")
@commands.has_role('user')
aysnc def uwu(ctx, *, message):
        response = ""
        for letter in message.content[len("!uwu")+1:]:
            if letter == "L" or letter == "R":
                response+="W"
            elif letter == "l" or letter == "r":
                response+="w"
            else:
                response+=letter
        await message.channel.send(response)

# @client.event
# async def on_message(message):
#     if message.author == client.user:
#         return

#     # if message.content.startswith("!gamzee"):
#     #     cap = False
#     #     response = ""
#     #     for letter in message.content[len("!gamzee")+1:].lower():
#     #         if cap and letter.isalpha():
#     #             response+=chr(ord(letter)-(26+6))
#     #         else:
#     #             response+=letter
#     #         cap = not cap
#     #     await message.channel.send(response)

#     if message.content.startswith("!uwu"):
#         response = ""
#         for letter in message.content[len("!uwu")+1:]:
#             if letter == "L" or letter == "R":
#                 response+="W"
#             elif letter == "l" or letter == "r":
#                 response+="w"
#             else:
#                 response+=letter
#         await message.channel.send(response)

#     if message.content.startswith("!rcolor"):
#         await message.channel.send("here's a color for you! https://www.colorhexa.com/" + hex(random.randint(0, 16777215))[2:])

#     if message.content.startswith("!convert"):
#         colorcode=message.content[len("!convert")+1:].split()
#         if colorcode[0].startswith("#"):
#             hexcolor=colorcode[1:]
#             red,grn,blu=color.hex_rgb(hexcolor)
#             await message.channel.send(f"Converting from HEX {colorcode} to RGB: ({red}, {grn}, {blu})")

@bot.command(name="members")
async def members(ctx):
    client.get_all_members()
    print("Member Count: "+ str(len(ctx.guild.members)))
    for member in ctx.guild.members:
        print(member)

bot.run(TOKEN)