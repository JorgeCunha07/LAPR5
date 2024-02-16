using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MGT.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Building = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    Room = table.Column<int>(type: "integer", nullable: false),
                    X = table.Column<int>(type: "integer", nullable: false),
                    Y = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TaskStatus = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    TaskType = table.Column<int>(type: "integer", nullable: false),
                    User = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    RobotId = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    RobotType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    FromLocationId = table.Column<int>(type: "integer", nullable: false),
                    ToLocationId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Locations_FromLocationId",
                        column: x => x.FromLocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_Locations_ToLocationId",
                        column: x => x.ToLocationId,
                        principalTable: "Locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveillanceTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    ContactInfo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveillanceTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveillanceTasks_Tasks_Id",
                        column: x => x.Id,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TransportTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    ContactStart = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ContactEnd = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ConfirmationCode = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransportTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransportTasks_Tasks_Id",
                        column: x => x.Id,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_FromLocationId",
                table: "Tasks",
                column: "FromLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_Name",
                table: "Tasks",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ToLocationId",
                table: "Tasks",
                column: "ToLocationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SurveillanceTasks");

            migrationBuilder.DropTable(
                name: "TransportTasks");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Locations");
        }
    }
}
