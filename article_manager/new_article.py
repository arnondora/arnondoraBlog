import sys
import os
import datetime

def print_help() :
    print("Usage : \n\tyarn new_article [<slug_name>]")

def init_program (article_path) :
    if len(sys.argv) == 1 :
        print("Please input required arguments, exitting")
        print_help()
        sys.exit(1)
    elif len(sys.argv) == 2 and sys.argv[1] == "help":
        print("A module for creating article")
        print_help()
        sys.exit(0)
    elif len(sys.argv) == 2 and check_existing_article(article_path, sys.argv[1]):
        print("ERROR: The article is already exist, please select the new one.")
    else :
        return sys.argv[1]

def get_settings_from_env_file(file_path) :
    settings = {}
    env_file = open(file_path, 'r').read().split("\n")

    for value in env_file :
        if value == "" or value == None :
            continue
        settings[value.split("=")[0]] = value.split("=")[1]

    return settings

def produce_article_folder_path (article_path, slug) :
    return article_path + '/' + slug

def check_existing_article (article_path, slug) :
    full_article_path = produce_article_folder_path(article_path, slug)
    return os.path.exists(full_article_path)

def create_new_article_folder (article_folder_path) :
    try :
        os.mkdir(article_folder_path)
    except :
        print("Something wrong in creating new article, please check the article folder and try again, exitting")
        sys.exit(1)

def create_article_from_template (article_folder_path) :
    template = {
    'title': "",
    'image': "",
    'category' : "",
    'excerpt' : '""',
    'subtitle' : "",
    'thumbnailCredit' : "",
    'date' : datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z"),
    'author' : "",
    'template' : "normal|full-width",
    'type' : "post|page",
    'isFeatured' : "true|false",
    'status' : "draft|published"
    }

    try :
        article_file = open(article_folder_path + "/index.md", 'w+')

        article_file.write("---\n")

        for key,value in template.items() :
            article_file.write(key + ": " + value + "\n")

        article_file.write("---\n")

        article_file.close()

        print("Successfully create boilerplate for a new artcle, the template placed on " + article_folder_path)

    except :
        print("Something wrong in creating new article file, please check the permission of the article folder and try again, exitting")
        os.rmdir(article_folder_path)
        sys.exit(1)

def main () :
    try :
        ENV_FILE_PATH = "./.env.production"
        ARTICLE_PATH = "." + get_settings_from_env_file(ENV_FILE_PATH)['ARTICLE_LOCATION']

        slug = init_program(ARTICLE_PATH)

        article_folder_path = produce_article_folder_path(ARTICLE_PATH, slug)

        create_new_article_folder(article_folder_path)
        create_article_from_template(article_folder_path)
    except:
        exit(1)

main()
