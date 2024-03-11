q_M_USERNAME=`jq --arg v "$M_USERNAME" -n '$v'`
q_M_PASSWORD=`jq --arg v "$M_PASSWORD" -n '$v'`
mongo -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" admin <<EOF
    use foo;
    db.createUser({
        user: $q_M_USERNAME,
        pwd: $q_M_PASSWORD,
        roles: ["readWrite"],
    });
EOF

# process >= 6
# mongosh - mongo >= 5
# _getEnv() - mongo == 4.4

# _getEnv() is undocumented
# https://stackoverflow.com/a/67037065/52499
# mongo -- "$MONGO_DB" <<EOF
#     db.getSiblingDB('admin').auth(
#         _getEnv('MONGO_INITDB_ROOT_USERNAME'),
#         _getEnv('MONGO_INITDB_ROOT_PASSWORD'),
#     );
#     db.createUser({
#         user: _getEnv('M_USERNAME'),
#         pwd: _getEnv('M_PASSWORD'),
#         roles: ["readWrite"],
#     });
# EOF