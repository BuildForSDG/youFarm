import {
    isEmpty,
    currentTimestamp,
    decodeJWToken
} from '../utils/helper';
import Article from '../models/article'
import Admin from "../models/admin";

class ArticleClass {
    async add(req, res) {
        try {
            const token = req.body.token || req.params.token || req.headers['x-access-token'];
            const logged_admin = decodeJWToken(token, "admin");
            const publisher = await Admin.findOne({
                _id: logged_admin
            })
            let {
                title,
                body,
                image_url,
                category,
                published
            } = req.body;
            const created_at = currentTimestamp();

            const requiredValues = [
                title,
                body,
                category
            ]
            const isValueEmpty = isEmpty(requiredValues);

            if (isValueEmpty)
                return res.status(200).json({
                    status: false,
                    message: 'Please fill all fields.'
                });

            const data = {
                title,
                body,
                image_url,
                category,
                published,
                publisher: {
                    _id: publisher._id,
                    name: publisher.first_name + " " + publisher.last_name,
                    email: publisher.email
                },
                created_at,
                updated_at: created_at
            }

            const newArticle = new Article(data)
            newArticle
                .save()
                .then(async (data) => {
                    const details = await Article.findOne({
                        _id: data._id
                    })
                    res.status(201).json({
                        status: true,
                        message: "Article created successfully",
                        data: details
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: "An error occur, failed to create article. Try again" + err
                    })
                })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: "An error occur, failed to create article. Try again" + error
            })
        }
    }

    async update(req, res) {
        try {
            let {
                title,
                body,
                image_url,
                category,
                published
            } = req.body;
            const updated_at = currentTimestamp();

            const requiredValues = [
                title,
                body,
                category
            ]
            const isValueEmpty = isEmpty(requiredValues);

            if (isValueEmpty)
                return res.status(200).json({
                    status: false,
                    message: 'Please fill all fields.'
                });

            const {
                article_id
            } = req.params;
            let {
                article_exists
            } = false;

            if (!article_id)
                return res.status(404).json({
                    status: false,
                    message: 'Article does not exists.'
                });

            const article = await Article.findOne({
                _id: article_id
            });
            article_exists = article ? true : false;

            if (!article_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Article does not exists.'
                });

            const data = {
                title,
                body,
                image_url,
                category,
                published,
                updated_at: updated_at
            }

            Article.findByIdAndUpdate(article_id, {
                $set: data
            })
                .then(async (data) => {
                    const details = await Article.findOne({
                        _id: article_id
                    })
                    res.status(201).json({
                        status: true,
                        message: "Article updated successfully",
                        data: details
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: "An error occur, failed to update article. Try again"
                    })
                })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: "An error occur, failed to create article. Try again"
            })
        }
    }

    async allArticles(req, res) {
        try {
            let all_articles = []
            const articles = await Article.find({}).sort({
                _id: -1
            });

            if (articles.length > 0) {
                for (let x in articles) {

                    all_articles.push({
                        _id: articles[x]._id,
                        title: articles[x].title,
                        body: articles[x].body,
                        image_url: articles[x].image_url,
                        category: articles[x].category,
                        published: articles[x].published,
                        publisher: articles[x].publisher,
                        created_at: articles[x].created_at,
                        updated_at: articles[x].updated_at
                    })
                }
                return res.status(200).json({
                    status: true,
                    data: all_articles
                });
            } else {
                return res.status(200).json({
                    status: false,
                    message: 'No article added yet.'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Unable to retrieve all articles.' + error
            });
        }
    }

    async articleDetailsById(req, res) {
        try {
            const {
                article_id
            } = req.params;
            let {
                article_exists
            } = false;

            if (!article_id)
                return res.status(404).json({
                    status: false,
                    message: 'Article does not exists.'
                });

            const article = await Article.findOne({
                _id: article_id
            });
            article_exists = article ? true : false;

            if (!article_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Article does not exists.'
                });

            let details = {
                _id: article._id,
                title: article.title,
                body: article.body,
                image_url: article.image_url,
                category: article.category,
                published: article.published,
                publisher: article.publisher,
                created_at: article.created_at,
                updated_at: article.updated_at
            };

            return res.status(200).json({
                status: true,
                data: details
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Article details was not retrieved. Try again.'
            });
        }
    }

    async delete(req, res) {
        try {
            const {
                article_id
            } = req.params;
            let {
                article_exists
            } = false;

            if (!article_id)
                return res.status(404).json({
                    status: false,
                    message: 'Article does not exists.'
                });

            const article = await Article.findOne({
                _id: article_id
            });
            article_exists = article ? true : false;

            if (!article_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Article does not exists.'
                });

            Article.findByIdAndDelete(article_id)
                .then((data) => {
                    res.status(201).json({
                        status: true,
                        message: 'Article successfully deleted.'
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        status: false,
                        message: 'An error occured. Unable to delete article. Try again.'
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occured. Unable to delete article. Try again.' + error
            });
        }
    }
}
module.exports = ArticleClass