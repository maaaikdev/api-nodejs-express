const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const TracksScheme = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        album: {
            type: String,
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL",
            },
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String,
            },
            nationality: {
                type: String,
            },
        },
        duration: {
            start: {
                type: Number,
            },
            end: {
                type: Number,
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

/**
 * Implement own method with storage relation
 */
TracksScheme.statics.findAllData = function () {
    const joinData = this.aggregate([
        //TODO Tracks
        {
            $lookup: {
                from: "storages", //TODO Tracks --> storages
                localField: "mediaId", //TODO Tracks.mediaId
                foreignField: "_id", //TODO Straoges._id
                as: "audio", //TODO Alias!
            },
        }
    ]);
    return joinData;
};
  
TracksScheme.statics.findOneData = async function (id) {

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const joinData = await this.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "storages", // La colección con la que se hace el join
                    localField: "mediaId", 
                    foreignField: "_id", 
                    as: "audio",
                },
            },
            {
                $unwind: "$audio",
            }
        ]).exec();

        return joinData.length ? joinData[0] : null; // Devolver el primer resultado o null
    } catch (error) {
        console.error("Error in findOneData:", error);
        throw error;
    }
};

// TracksScheme.findAllData = function(){
//     TracksScheme.belongsTo(Storage, {
//         foreignKey: "mediaId",
//         as: "audio"
//     });

//     return TracksScheme.findAll({ include: 'audio' })
// };

// TracksScheme.findAOneData = function(){
//     TracksScheme.belongsTo(Storage, {
//         foreignKey: "mediaId",
//         as: "audio"
//     });

//     return TracksScheme.findOne({ where:{id}, include: 'audio' })
// };

TracksScheme.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model("tracks", TracksScheme)